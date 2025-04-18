import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: FieldValidation;
}

interface DynamicFormProps {
  fields: FormField[];
  submitButtonText: string;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ 
  fields, 
  submitButtonText, 
  onSubmit,
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Initialize form data with default values
    const initialFormData: Record<string, any> = {};
    fields.forEach((field) => {
      initialFormData[field.name] = '';
    });
    setFormData(initialFormData);
  }, [fields]);

  const validateField = (name: string, value: any, validation?: FieldValidation): string => {
    if (!validation) return '';

    if (validation.required && (!value || value.trim() === '')) {
      return validation.message || 'This field is required';
    }

    if (validation.minLength && value.length < validation.minLength) {
      return validation.message || `Minimum length is ${validation.minLength} characters`;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return validation.message || `Maximum length is ${validation.maxLength} characters`;
    }

    if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
      return validation.message || 'Invalid format';
    }

    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field.name, value, field.validation);
      
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, options, validation } = field;
    
    switch (type) {
      case 'select':
        return (
          <Form.Select
            name={name}
            value={formData[name] || ''}
            onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
            isInvalid={!!errors[name]}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        );
      
      case 'textarea':
        return (
          <Form.Control
            as="textarea"
            rows={3}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
          />
        );
      
      case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            name={name}
            checked={!!formData[name]}
            onChange={(e) => 
              setFormData({ 
                ...formData, 
                [name]: e.target.checked 
              })
            }
            label={label}
            isInvalid={!!errors[name]}
          />
        );
      
      default:
        return (
          <Form.Control
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            isInvalid={!!errors[name]}
          />
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-animate">
      {fields.map((field) => (
        field.type === 'checkbox' ? (
          <Form.Group className="mb-3" key={field.name}>
            {renderField(field)}
            {errors[field.name] && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors[field.name]}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        ) : (
          <Form.Group className="mb-3" key={field.name}>
            <Form.Label>{field.label}</Form.Label>
            {renderField(field)}
            {errors[field.name] && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors[field.name]}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        )
      ))}
      
      <Button 
        variant="primary" 
        type="submit" 
        className="w-100 mt-4" 
        disabled={submitting || isLoading}
      >
        {submitting || isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    </Form>
  );
};

export default DynamicForm;