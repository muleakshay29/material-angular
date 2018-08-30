export class ValidationService 
{
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) 
    {
      let config = 
        {
            'null': 'Required',
            'required': 'Required',
            'email': 'Invalid email',
            'invalidFormat': 'Only characters are allowed',
            'alreadyExist': 'Already exist',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };
  
      return config[validatorName];
    }

    static characterPattern(control)
    {
      if(control.value === null)
      {
        return { 'invalidFormat': true };
      }
      else
      {
        if (control.value.match(/^[a-zA-Z]{3,100}$/)) 
        {
          return null;
        } 
        else 
        {
          return { 'invalidFormat': true };
        }
      }
    }
  
    static passwordValidator(control) 
    {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) 
      {
        return null;
      } 
      else 
      {
        return { 'invalidPassword': true };
      }
    }
}
  