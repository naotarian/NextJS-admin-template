export interface Employee {
  id: string // ULID形式の識別子
  dental_office_id: string // ULID形式の歯科オフィス識別子
  employee_number: string // 従業員番号（数値文字列）
  name: string // 名前（日本語含む）
  email: string // メールアドレス
  phone: string // 電話番号（ハイフンあり）
  role: 'admin' | 'staff' | 'other' // 役割（固定値の例）
  is_active: boolean // 有効かどうか
  created_at: string // 作成日時（ISO8601形式の文字列）
  updated_at: string // 更新日時（ISO8601形式の文字列）
}
