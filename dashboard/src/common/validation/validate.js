export async function validateForm(zodSchema, formState) {
    try {
        const theFormState = {};
        Object.keys(formState).forEach(
            (fieldName) => (theFormState[fieldName] = formState[fieldName]?.value || null),
        );
        await zodSchema.parse(theFormState);
        return { success: true, errors: null };
    } catch (validationErrors) {
        const newErrors = {};
        validationErrors.errors.forEach((err) => {
            newErrors[err.path[0]] = err.message;
        });
        console.error('form validation Error:', newErrors);
        return { success: false, errors: newErrors };
    }
}
