import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface DynamicFormProps {
  fields: FormField[];
  submitButtonText: string;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  isLoading: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  submitButtonText,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.name] = "";
    });
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Group controlId={field.name} className="mb-3" key={field.name}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        </Form.Group>
      ))}

      <div className="d-grid">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Loading...
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </div>
    </Form>
  );
};

export default DynamicForm;
