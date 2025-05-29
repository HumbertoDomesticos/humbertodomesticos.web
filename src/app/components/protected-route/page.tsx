// 'use client';

// import { useAuth } from '@/app/context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push('/login');
//     }
//   }, [isAuthenticated, loading, router]);

//   if (loading || !isAuthenticated) {
//     return <div>Carregando...</div>;
//   }

//   return <>{children}</>;
// }