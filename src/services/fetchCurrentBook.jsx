import { supabase } from "../utils/supabaseClient";

const fetchCurrentBook = async (_id) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", _id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export default fetchCurrentBook;
