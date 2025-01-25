# Input コンポーネント

`Input` コンポーネントは、Material-UI の `TextField` を拡張した汎用的な入力フィールドです。`type="password"` の場合には、目のアイコンを表示して入力内容を表示/非表示に切り替える機能が含まれています。また、`maxLength` プロパティや、カスタムラベルの指定も可能です。

---

## 特徴

- Material-UI の `TextField` をベースに拡張。
- `type="password"` の場合に入力値の表示/非表示を切り替え可能。
- `maxLength` プロパティを使用して入力の文字数制限を設定可能。
- 全ての Material-UI の `TextField` プロパティを継承。
- アクセシビリティ対応 (`aria-label` を設定)。
- **React.FC** による型付け。

---

## プロパティ

| プロパティ  | 型                                       | デフォルト値 | 説明                                                                    |
| ----------- | ---------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| `label`     | `string`                                 | `undefined`  | 入力フィールドのラベル。                                                |
| `type`      | `'text'` / `'password'` / その他         | `'text'`     | 入力タイプを指定（例: `'password'`, `'email'`）。                       |
| `maxLength` | `number`                                 | `undefined`  | 入力可能な最大文字数を指定。                                            |
| `variant`   | `'outlined'` / `'filled'` / `'standard'` | `'outlined'` | 入力フィールドのスタイルを指定。                                        |
| その他      | `MuiTextFieldProps`                      | -            | Material-UI の `TextField` がサポートする全てのプロパティを継承します。 |

---

## 使用例

```tsx
import React from 'react'
import Input from '@/component/Atoms/Input'

const Example = () => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Input
        label="従業員番号"
        type="text"
        maxLength={7}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
      <Input
        label="パスワード"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
    </div>
  )
}

export default Example
```
