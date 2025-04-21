export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  auth: {
    User: {
      id: string
      email?: string
      user_metadata: {
        first_name: string
        last_name: string
      }
    }
    Session: {
      user: Database['auth']['User']
    }
  }
  public: {
    Tables: {
      photographer_links: {
        Row: {
          id: string
          user_id: string
          photographer_name: string
          drive_link: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          photographer_name: string
          drive_link: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          photographer_name?: string
          drive_link?: string
          created_at?: string
        }
      }
    }
  }
} 