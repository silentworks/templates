<script lang="ts">
	export let label: string = "";
	export let value: string = "";
	export let fieldId: string = "";
</script>

<div class="form-control">
	<label for={fieldId} class="label">{label}</label>
	<input id={fieldId} type="password" bind:value class="input input-bordered" />
</div>
