import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { object, string } from "yup";
import Box from "@mui/material/Box";
import { Form } from "formik";
export const loginSchema = object({
  email: string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(16, "Şifre en fazla 16 karakter olmalıdır")
    .matches(/\d+/, "Şifre en az bir rakam içermelidir.")
    .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir.")
    .matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir.")
    .matches(
      /[@$!%*?&]+/,
      "Şifre en az bir özel karakter(@$!%*?&) içermelidir."
    ),
});
const LoginForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  isSubmitting,
}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </Form>
  );
};
export default LoginForm;
