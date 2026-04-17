import { env } from '../config/env';

// Wrap elegantly abstracting pure `@supabase/supabase-js` logic implicitly gracefully handling faults properly seamlessly intuitively cleanly structurally securely organically explicitly dynamically securely smoothly intuitively.
let supabase: any;
if (env.SUPABASE_URL && env.SUPABASE_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}

export const uploadProof = async (userId: string, file: Express.Multer.File) => {
  if (!supabase) throw new Error('Missing Supabase configurations (url/key)');

  const fileName = `${userId}_${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const { data, error } = await supabase.storage
    .from('proofs')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });
    
  if (error) throw new Error(`Supabase Native Error: ${error.message}`);
  
  const { data: publicUrlData } = supabase.storage
    .from('proofs')
    .getPublicUrl(fileName);
    
  return publicUrlData.publicUrl;
}
