/**
 * @type {HTMLFormElement | null}
 */
const deleteForm = document.querySelector('#delete-form');
if (!deleteForm) throw new Error('Could not find the delete form.');

const formAction = deleteForm.getAttribute('action');
if (!formAction) throw new Error('The form action attribute is null.');

deleteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(deleteForm));
  try {
    const response = await fetch(formAction, {
      method: 'DELETE',
      body: JSON.stringify(formData),
    });

    /**
     * @type {{redirectTo: string}}
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { redirectTo } = await response.json();

    location.replace(redirectTo);
  } catch (error) {
    console.error(error);
  }
});
