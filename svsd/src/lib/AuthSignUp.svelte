<script lang="ts">
	import { supabase } from "$lib/db";
	import { pageState } from "$lib/store";
	import EmailField from "$lib/form/EmailField.svelte";
	import PasswordField from "$lib/form/PasswordField.svelte";

	let email: string;
	let password: string;

	const signUp = async () => {
		const { session, error } = await supabase.auth.signUp({
			email,
			password,
		});
	};
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	<h2 class="font-semibold text-4xl mb-4">Create an account</h2>
	<p class="font-medium mb-4">Let's get started</p>
	<form class="" on:submit|preventDefault={signUp}>
		<EmailField label="Email" fieldId="email" bind:value={email} />
		<PasswordField label="Password" fieldId="password" bind:value={password} />
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Create account</button>
		</div>
	</form>
	<div class="pt-4 text-center">
		Already have an account? <button
			on:click={() => ($pageState = "SIGN_IN")}
			class="underline text-blue-500"
		>
			Log in
		</button>
	</div>
</div>
