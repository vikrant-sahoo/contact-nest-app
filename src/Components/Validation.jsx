export default function Validation(values) {
      let errors = {}

      const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

      if (values?.name) {
            if (values.name === "") {
                  errors.name = "Name should not be Empty.";
            } else if (values.name.length < 3 || values.name.length > 30) {
                  errors.name = "Name must be between 3 and 30 characters.";
            } else {
                  errors.name = "";
            };
      }

      if (values.email === "") {
            errors.email = "Email cannot be Empty.";
      // } else if (!email_pattern.test(values.email)) {
            // errors.email = "Invalid Email!";
      } else {
            errors.email = "";
      };

      if (values.password === "") {
            errors.password = "Password cannot be Empty.";
      // } else if (!password_pattern.test(values.password)) {
      //       errors.password = "Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).";
      } else {
            errors.password = "";
      };

      return errors;
};