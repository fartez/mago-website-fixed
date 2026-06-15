import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const BASELINE = 48142;
const SESSION_KEY = 'visitor_counted';

interface VisitorData {
  total: number;
  todayCount: number;
  loading: boolean;
}

export function useVisitorCount(): VisitorData {
  const [todayCount, setTodayCount] = useState(0);
  const [allTimeSum, setAllTimeSum] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === today;

    async function recordAndFetch() {
      if (!alreadyCounted) {
        await supabase.rpc('increment_visitor', { p_date: today });
        sessionStorage.setItem(SESSION_KEY, today);
      }

      const { data } = await supabase
        .from('visitor_stats')
        .select('visit_date, daily_count');

      if (data) {
        const sum = data.reduce((acc, row) => acc + row.daily_count, 0);
        const todayRow = data.find((row) => row.visit_date === today);
        setAllTimeSum(sum);
        setTodayCount(todayRow?.daily_count ?? 0);
      }

      setLoading(false);
    }

    recordAndFetch();
  }, []);

  return {
    total: BASELINE + allTimeSum,
    todayCount,
    loading,
  };
}
