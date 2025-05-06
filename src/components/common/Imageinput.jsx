import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../createClient";

export const Imageinput = ({ title, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `skills/${fileName}`;

    console.log("Uploading file to:", filePath);
    const { error: uploadError } = await supabase.storage
      .from("skills")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      console.error("Upload error:", uploadError);
      setUploading(false);
      return;
    }

    console.log("Fetching public URL for:", filePath);
    let publicUrl;
    try {
      const { data, error: urlError } = await supabase.storage
        .from("skills")
        .getPublicUrl(filePath);

      if (urlError || !data?.publicUrl) {
        setError(`Failed to get public URL: ${urlError?.message || 'No URL returned'}`);
        console.error("Public URL error:", urlError || "No URL");
        setUploading(false);
        return;
      }

      publicUrl = data.publicUrl;
      console.log("Generated public URL:", publicUrl);
    } catch (fetchError) {
      setError(`Fetch error: ${fetchError.message}`);
      console.error("Fetch error during public URL retrieval:", fetchError);
      setUploading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from("tblSkills")
        .insert({ image_url: publicUrl, name: file.name });

      if (insertError) {
        setError(`Database insert failed: ${insertError.message}`);
        console.error("Insert error:", insertError);
      } else {
        console.log("Calling onChange with URL:", publicUrl);
        onChange(publicUrl); // Pastikan URL dikirim ke parent
      }
    } catch (insertFetchError) {
      setError(`Insert fetch error: ${insertFetchError.message}`);
      console.error("Fetch error during insert:", insertFetchError);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-35 h-fit font-lex">
      <div className="w-1/3 h-full text-phantom-400">
        <label htmlFor={title} className="font-semibold p-1">{title}</label>
      </div>
      <div className="w-2/3 h-fit flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          id={title}
          name={title}
          onChange={handleUpload}
          className="text-sm text-white bg-[#ffffff0a] rounded-xl border border-phantom-600 p-2"
          disabled={uploading}
        />
        {value && (
          <div className="border border-phantom-600 rounded-lg p-1 w-fit">
            <img
              src={value}
              alt="preview"
              className="w-20 h-20 object-contain rounded-md"
            />
          </div>
        )}
        {uploading && <p className="text-xs text-phantom-400">Uploading...</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};