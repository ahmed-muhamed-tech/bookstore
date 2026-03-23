import React from "react";
import { supabase } from "../utils/supabaseClient";

const fetchCategories = async () => {
  const { data, error } = await supabase.from("category").select();
  if (error) throw new Error(error.message);
  return data;
};

export default fetchCategories;
