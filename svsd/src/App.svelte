<script lang="ts">
	import { onMount } from "svelte";
	import { supabase } from "$lib/db";
	import type { User } from "@supabase/supabase-js";
	import AuthLogin from "$lib/AuthLogin.svelte";
	import { pageState } from "$lib/store";
	import AuthSignUp from "$lib/AuthSignUp.svelte";

	let user: User;

	onMount(() => {
		const currentSession = supabase.auth.session();
		user = currentSession?.user;

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				user = session?.user;
			},
		);

		return () => authListener?.unsubscribe();
	});
</script>

<main data-theme="winter">
	<div class="flex flex-col h-screen">
		<div class="header border-b border-gray-300 py-8 px-4 mx-8 text-center">
			<h1 class="font-semibold">Svelte + Supabase + DaisyUI</h1>
		</div>
		<div class="grid place-items-center my-20 mx-2 sm:my-auto">
			{#if $pageState == "SIGN_IN"}
				<AuthLogin />
			{:else if $pageState == "SIGN_UP"}
				<AuthSignUp />
			{/if}
		</div>
	</div>
</main>
