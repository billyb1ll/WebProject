import { set } from "react-hook-form";

function passwordStrengthMeter(password: string): number {
	let strength = 0;
	if (password.length < 5) {
		strength -= 1;
    }
    if (password.length >= 5) {
        strength += 1;
    }
    if (password.length >= 8) {
        strength += 1;
    }
    
    return strength;
}
