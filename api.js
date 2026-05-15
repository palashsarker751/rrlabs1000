// api.js - Interaction with Supabase

const fetchStats = async (merchantId) => {
  // Total Recovered Amount
  const { data, error } = await supabase
    .from('recoveries')
    .select('cart_value')
    .eq('merchant_id', merchantId)
    .eq('status', 'recovered');

  if (error) return 0;
  return data.reduce((acc, curr) => acc + curr.cart_value, 0);
};

const getRecentRecoveries = async (merchantId) => {
  const { data, error } = await supabase
    .from('recoveries')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(5);
    
  return data || [];
};
