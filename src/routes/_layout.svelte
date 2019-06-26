<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import Nav from '../components/Nav.svelte';

    let { session } = stores();
    let loading = false;

    onMount(async () => {
        if (process.browser) {
            const mod = await import('../firebase/auth.js');
            let auth = mod.default;

            auth.onAuthStateChanged(user => {
                if (user) {
                    session.update(s => {
                        s.user = user;
                        return s;
                    });
                } else {
                    session.update(s => {
                        s.user = undefined;
                        return s;
                    });
                }

                loading = false;
            });
        }
    });

    export let segment;
</script>

<Nav {segment} />

<main>
    <slot />
</main>
