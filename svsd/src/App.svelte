<script lang="ts">
	import { onMount } from "svelte";
	import { supabase } from "$lib/db";
	import type { User } from "@supabase/supabase-js";
	import AuthLogin from "$lib/AuthLogin.svelte";
	import { pageState } from "$lib/store";
	import AuthSignUp from "$lib/AuthSignUp.svelte";

	let user: User;

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			user = session?.user;
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			user = session?.user;
		});

		return () => subscription?.unsubscribe();
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
