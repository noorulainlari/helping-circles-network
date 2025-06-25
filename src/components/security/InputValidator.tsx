
import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string()
  .email('Invalid email format')
  .min(1, 'Email is required');

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

// Phone number validation
export const phoneSchema = z.string()
  .regex(/^\+?[\d\s-()]{10,15}$/, 'Invalid phone number format');

// Amount validation
export const amountSchema = z.number()
  .positive('Amount must be positive')
  .min(1, 'Minimum amount is ₹1')
  .max(50000, 'Maximum amount is ₹50,000');

// Referral code validation
export const referralCodeSchema = z.string()
  .regex(/^[A-Z0-9]{6,10}$/, 'Invalid referral code format')
  .optional();

// File validation
export const validateFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and PDF files are allowed');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  return true;
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

// Validate withdrawal details
export const withdrawalDetailsSchema = z.object({
  accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format'),
  bankName: z.string().min(2, 'Bank name is required'),
  accountHolderName: z.string().min(2, 'Account holder name is required'),
});

export const upiDetailsSchema = z.object({
  upiId: z.string().regex(/^[\w.\-_]{3,}@[\w.\-_]{2,}$/, 'Invalid UPI ID format'),
  name: z.string().min(2, 'Name is required'),
});
