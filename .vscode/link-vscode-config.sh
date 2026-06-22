#!/usr/bin/env bash
#
# .vscode/ 配下の *.sample.json それぞれについて、"sample" を取り除いた名前で
# シンボリックリンクを作成する。
#
#   例: launch.sample.json  →  launch.json（symlink）が launch.sample.json を指す
#
set -euo pipefail

# スクリプト自身の場所（= .vscode ディレクトリ）を絶対パスで解決する。
# これにより、どの cwd から実行しても常に正しいディレクトリを対象にできる。
vscode_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

shopt -s nullglob
samples=("${vscode_dir}"/*.sample.json)

if (( ${#samples[@]} == 0 )); then
  echo "エラー: ${vscode_dir} に *.sample.json が見つかりません。" >&2
  exit 1
fi

for sample in "${samples[@]}"; do
  base="$(basename -- "${sample}")"        # 例: launch.sample.json
  link="${base%.sample.json}.json"          # 例: launch.json
  link_path="${vscode_dir}/${link}"

  # 既存の「実ファイル」（シンボリックリンクでない）は壊さない。
  if [[ -e "${link_path}" && ! -L "${link_path}" ]]; then
    echo "スキップ: ${link} は実ファイルとして存在します（手動で確認してください）。" >&2
    continue
  fi

  # 相対パス（base = ファイル名のみ）でリンク。リポジトリを移動・clone しても壊れない。
  # -f で既存リンクは貼り直し、-n でリンク先ディレクトリを誤って辿らない。
  ln -sfn -- "${base}" "${link_path}"
  echo "リンク作成: ${link} -> ${base}"
done
