<script lang="ts">
	import { supabase } from "$lib/db";
	import { pageState } from "$lib/store";
	import EmailField from "$lib/form/EmailField.svelte";
	import PasswordField from "$lib/form/PasswordField.svelte";

	let passwordLess = false;

	let email: string;
	let password: string;

	const login = async () => {
		if (passwordLess) {
			const { error } = await supabase.auth.signInWithOtp({ email });
		} else {
			const {
				data: { session },
				error,
			} = await supabase.auth.signInWithPassword({
				email,
				password,
			});
		}
	};
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	<h2 class="font-semibold text-4xl mb-4">Login</h2>
	<p class="font-medium mb-4">Hi, Welcome back</p>
	<button
		class="btn btn-outline border-gray-200 hover:bg-transparent hover:text-gray-500 gap-2 w-full normal-case no-animation"
	>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 0.184998C5.373 0.184998 0 5.558 0 12.185C0 17.808 3.872 22.513 9.092 23.815C9.036 23.653 9 23.465 9 23.232V21.181C8.513 21.181 7.697 21.181 7.492 21.181C6.671 21.181 5.941 20.828 5.587 20.172C5.194 19.443 5.126 18.328 4.152 17.646C3.863 17.419 4.083 17.16 4.416 17.195C5.031 17.369 5.541 17.791 6.021 18.417C6.499 19.044 6.724 19.186 7.617 19.186C8.05 19.186 8.698 19.161 9.308 19.065C9.636 18.232 10.203 17.465 10.896 17.103C6.9 16.692 4.993 14.704 4.993 12.005C4.993 10.843 5.488 9.719 6.329 8.772C6.053 7.832 5.706 5.915 6.435 5.185C8.233 5.185 9.32 6.351 9.581 6.666C10.477 6.359 11.461 6.185 12.495 6.185C13.531 6.185 14.519 6.359 15.417 6.668C15.675 6.355 16.763 5.185 18.565 5.185C19.297 5.916 18.946 7.841 18.667 8.779C19.503 9.724 19.995 10.845 19.995 12.005C19.995 14.702 18.091 16.689 14.101 17.102C15.199 17.675 16 19.285 16 20.498V23.232C16 23.336 15.977 23.411 15.965 23.5C20.641 21.861 24 17.421 24 12.185C24 5.558 18.627 0.184998 12 0.184998Z"
				fill="black"
				fill-opacity="0.6"
			/>
		</svg>
		Login with GitHub
	</button>
	<div class="divider text-gray-400 text-sm">or Login with Email</div>
	<form class="" on:submit|preventDefault={login}>
		<EmailField label="Email" fieldId="email" bind:value={email} />
		{#if !passwordLess}
			<PasswordField
				label="Password"
				fieldId="password"
				bind:value={password}
			/>
		{/if}
		<div class="form-control flex-row justify-between pt-4">
			<label class="label justify-start cursor-pointer gap-2 text-gray-500">
				<input
					type="checkbox"
					class="toggle toggle-xs"
					on:change={() => {
						passwordLess = !passwordLess;
					}}
				/>
				Passwordless login
			</label>
			<a class="block py-2 text-blue-500" href="/forgot">Forgot Password?</a>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Login</button>
		</div>
	</form>
	<div class="pt-4 text-center">
		Not registered yet? <button
			on:click={() => {
				$pageState = "SIGN_UP";
			}}
			class="underline text-blue-500"
		>
			Create an account
		</button>
	</div>
</div>
