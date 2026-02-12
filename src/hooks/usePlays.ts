import { useCallback } from "react";
import { plays as staticPlays, type Play, type MethodologyPhase, getPlaysByPhase as getByPhase } from "@/data/newPlays";
import { playDetails as staticDetails, type PlayDetail, getPlayDetail as getDetail } from "@/data/newPlayDetails";

export function usePlays() {
  const getPlayById = useCallback((id: string): Play | undefined => {
    return staticPlays.find(p => p.id === id);
  }, []);

  const getPlayDetail = useCallback((id: string): PlayDetail | undefined => {
    return getDetail(id);
  }, []);

  const getPlaysByPhase = useCallback((phase: MethodologyPhase): Play[] => {
    return getByPhase(phase);
  }, []);

  return { getPlayById, getPlayDetail, getPlaysByPhase };
}
