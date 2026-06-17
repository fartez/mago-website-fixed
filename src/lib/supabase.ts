import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const createNoopSupabase = () => {
  const noop = async (result: any = { data: [], error: null }) => result;

  const from = () => ({
    select: async () => ({ data: [], count: 0, error: null }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
    upsert: async () => ({ data: null, error: null }),
  });

  return {
    from,
    rpc: async () => ({ data: null, error: null }),
    storage: {
      from: () => ({
        getPublicUrl: () => ({ data: { publicUrl: '' }, error: null }),
        upload: async () => ({ data: null, error: null }),
        remove: async () => ({ data: null, error: null }),
      }),
    },
    auth: {
      signIn: async () => ({ data: null, error: null }),
      signOut: async () => ({ data: null, error: null }),
    },
  };
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createNoopSupabase();
