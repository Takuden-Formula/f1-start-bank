# F1スタート貯金箱（iPhone 6s 用 Web アプリ）

紅陵祭2026 電気自動車同好会のキーホルダー販売用。ピンボールを落ちたコインを ESP32 のセンサーが検知し、
画面で F1 スタートシグナルを再現、一斉消灯の瞬間に ESP32（Wi-Fi「F1BANK」、`https://192.168.4.1/open`）へ
ゲートを開ける指示を送る。

- アプリ: https://takuden-formula.github.io/f1-start-bank/
- `ca.crt`: ESP32 との HTTPS 通信用の自作 CA 証明書（公開証明書のみ。秘密鍵はここには置かない）
- ESP32 のスケッチ・証明書の秘密鍵・説明書は大学 OneDrive（紅陵祭2026\F1スタート貯金箱）にある
