export const VALIDATION = {
	PASSWORD: {
		MIN_LENGTH: 8,
		MIN_STRENGTH: 2,
	},
	EMAIL_DOMAINS: {
		GMAIL: "@gmail.com",
		YAHOO: "@yahoo.com",
		OUTLOOK: "@outlook.com",
		CUSTOM: "@custom",
	},
	ERROR_MESSAGES: {
		REQUIRED: "This field is required",
		PASSWORD_TOO_SHORT: "Password must be at least 8 characters long",
		PASSWORD_TOO_WEAK:
			"Password is too weak. Include uppercase letters, numbers, or special characters.",
		TERMS_REQUIRED: "You must agree to the terms and conditions",
		INVALID_EMAIL: "Please enter a valid email address",
	},
	EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
