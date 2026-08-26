/**
 * @type {HTMLFormElement | null}
 */
const deleteForm = document.querySelector('#delete-form');
if (!deleteForm) throw new Error('Could not find the delete form.');

const formAction = deleteForm.getAttribute('action');
if (!formAction) throw new Error('The form action attribute is null.');

/**
 * @param {import('express-validator').FieldValidationError[]} errors
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const renderError = (errors) => {
  for (const { path, msg } of errors) {
    console.error(msg);
    deleteForm
      .querySelector(`[name="${CSS.escape(path)}"]`)
      ?.classList.add('error');
  }
};

deleteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(deleteForm));
  try {
    const response = await fetch(formAction, {
      method: 'DELETE',
      // @ts-expect-error - This works so I don't know why it's causing an error.
      body: new URLSearchParams(formData),
    });

    /**
     * @type {{redirectTo: string | undefined, errors: import('express-validator').FieldValidationError[] | undefined}}
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { redirectTo, errors } = await response.json();
    if (redirectTo) {
      location.replace(redirectTo);
    } else if (errors) {
      renderError(errors);
    }
  } catch (error) {
    console.error(error);
  }
});
