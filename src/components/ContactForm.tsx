import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { ContactMessage } from '../types';
import styles from './ContactForm.module.css';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactMessage) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    // RFC 5322 simplified email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (value.trim().length === 0) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        break;
      
      case 'email':
        if (value.trim().length === 0) {
          return 'Email is required';
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        break;
      
      case 'message':
        if (value.trim().length === 0) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    
    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;
    
    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit messages when user modifies form
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const contactMessage: ContactMessage = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: new Date(),
        userAgent: navigator.userAgent
      };

      if (onSubmit) {
        await onSubmit(contactMessage);
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      className={`${styles.contactForm} ${isSubmitting ? styles.loading : ''} ${submitSuccess ? styles.success : ''} ${submitError ? styles.error : ''}`} 
      onSubmit={handleSubmit} 
      noValidate
    >
      <div className={`${styles.formGroup} ${formData.name ? styles.hasValue : ''}`}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span id="name-error" className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={`${styles.formGroup} ${formData.email ? styles.hasValue : ''}`}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span id="email-error" className={styles.error} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={`${styles.formGroup} ${formData.message ? styles.hasValue : ''}`}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span id="message-error" className={styles.error} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitSuccess && (
        <div className={styles.successMessage} role="status" aria-live="polite">
          Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {submitError && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          {submitError}
        </div>
      )}
    </form>
  );
}
