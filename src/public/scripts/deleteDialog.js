/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * @param {string} cssSelector
 * @return {HTMLElement}
 */
const getHTMLElement = (cssSelector) => {
  const element = document.querySelector(cssSelector);

  if (!(element instanceof HTMLElement))
    throw new Error(
      `Could not find the element with the selector ${cssSelector}.`,
    );

  return element;
};

/**
 * @param {string} cssSelector
 * @return {HTMLFormElement}
 */
const getHTMLFormElement = (cssSelector) => {
  const formElement = getHTMLElement(cssSelector);
  if (!(formElement instanceof HTMLFormElement))
    throw new Error(
      `Element found with selector ${cssSelector} is not a form element.`,
    );

  return formElement;
};

const dialogOpenButton = getHTMLElement('#open-delete-dialog-btn');
const dialogCloseButton = getHTMLElement('#close-delete-dialog-btn');
const dialogModal = getHTMLElement('#delete-dialog');
if (!(dialogModal instanceof HTMLDialogElement))
  throw new Error('The dialogModal element is not a dialog element.');

const deleteFormSelector = '#delete-form';
const deleteForm = getHTMLFormElement(deleteFormSelector);

const formAction = deleteForm.getAttribute('action');
if (!formAction) throw new Error('The form action attribute is null.');

/**
 * @param {import('express-validator').FieldValidationError[]} errors
 */
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

const closeDialog = () => {
  dialogModal.close();
};

dialogOpenButton.addEventListener('click', () => {
  dialogModal.showModal();
});

dialogCloseButton.addEventListener('click', closeDialog);

document.body.addEventListener('mousedown', (event) => {
  if (!dialogModal.open) return;
  const { target } = event;
  if (!(target instanceof HTMLElement)) return;

  if (target === deleteForm || target.closest(deleteFormSelector)) return;

  closeDialog();
});

deleteForm.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDialog();
});
