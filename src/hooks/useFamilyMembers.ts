import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';

export function useFamilyMembers() {
  const [members, setMembers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load family members from Supabase
      loadMembers();
    } else {
      setMembers([]);
    }
  }, [user]);

  const loadMembers = async () => {
    const { data, error } = await supabase
      .from('family_members')
      .select('name')
      .order('created_at');

    if (!error && data) {
      setMembers(data.map(member => member.name));
    }
  };

  const addMember = async (name: string) => {
    if (!user || members.includes(name)) return;

    const { error } = await supabase
      .from('family_members')
      .insert({ name, user_id: user.id });

    if (!error) {
      setMembers([...members, name]);
    }
  };

  const removeMember = async (name: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('name', name)
      .eq('user_id', user.id);

    if (!error) {
      setMembers(members.filter(member => member !== name));
    }
  };

  return {
    members,
    addMember,
    removeMember,
  };
}