import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
function UseDeletedCurrentBook() {
  const handleDeleteCurrentBook = async (id) => { 
    const { data: book, error: fetchError } = await supabase
      .from("books")
      .select("image, title")
      .eq("id", id)
      .single();

    if (fetchError || !book) {
      toast.error("تعذر العثور على بيانات الكتاب");
      return;
    }

    const imagePublicUrl = book.image;

    const filePath = imagePublicUrl.split("/books/")[1];
    const { error: storageError } = await supabase.storage
      .from("books")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage Error:", storageError);
      toast.error(`خطأ في حذف الصورة: ${storageError.message}`);
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`تم حذف كتاب ${data[0]?.title} بنجاح`);
  };
  return { handleDeleteCurrentBook };
}

export default UseDeletedCurrentBook;
