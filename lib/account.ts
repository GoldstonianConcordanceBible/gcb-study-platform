import { getCollection } from "./content";

export type UserProgress = {
  user_id: string;
  content_type: "video" | "podcast" | "course" | "reading-plan" | "article";
  content_id: string;
  status: "not_started" | "in_progress" | "completed";
  percent_complete?: number;
  last_accessed?: string;
  notes?: string;
};

export type TokenAccess = {
  id: string;
  access_type: "community" | "study" | "governance" | "contributor";
  description: string;
  token_name?: string;
  token_chain?: string;
};

export type Credential = {
  id: string;
  credential_type: "Concordance Witness" | "Covenant Scholar" | "GCB Steward" | "Ark Seal";
  course_id: string;
  wallet_address: string;
  issued_date?: string;
  metaplex_url?: string;
};

export function getDemoProgress(): UserProgress[] {
  return getCollection<UserProgress>("data/account");
}

export function getTokenAccess(): TokenAccess[] {
  return getCollection<TokenAccess>("data/token");
}

export function getCredentials(): Credential[] {
  return getCollection<Credential>("data/credentials");
}