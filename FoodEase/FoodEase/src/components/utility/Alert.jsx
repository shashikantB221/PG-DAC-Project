import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
export default function AlertBox({ variant, message }) {
  return (
    <Alert key={variant} variant={variant}>
      {message}
    </Alert>
  );
}
