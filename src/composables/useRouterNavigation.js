import { useRoute, useRouter } from 'vue-router';

export default function useRouterNavigation() {
  const router = useRouter();
  const route = useRoute();

  const goBack = () => {
    router.push(route.path.split('/').slice(0, -2).join('/') + '/');
  };

  return {
    goBack,
  };
}
