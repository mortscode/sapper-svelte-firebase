<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';

    const { session } = stores();
    $: user = $session.user;

    let client;

    onMount(async () => {
        if (process.browser) {
            client = await import('../firebase/firebase.js');
        }
    });

    function login() {
        console.error(client);
        client.loginWithPopup().then(u => {
            console.error('logged', $session.user);
        });
    }

    function logoutNow() {
        client.logout().then(() => {
            console.error('logged out');
        });
    }
</script>

<h1>Home</h1>

{#if user}
    <h2>You are logged in as: {user.displayName}</h2>
    <button on:click={logoutNow} class="button">Logout</button>
{:else}
    <h2>You are not logged in</h2>
    <button on:click={login} class="button">Log in</button>
{/if}
