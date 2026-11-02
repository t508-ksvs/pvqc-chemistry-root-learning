# 網站發布與交接

日期：2026-11-02。使用者明確要求在 GitHub 發表網站，提供講義版、學生學習版兩個入口，共用素材，並記錄至正式 Obsidian。

- 首頁：https://t508-ksvs.github.io/pvqc-chemistry-root-learning/
- 講義版：https://t508-ksvs.github.io/pvqc-chemistry-root-learning/handout.html
- 學生學習版：https://t508-ksvs.github.io/pvqc-chemistry-root-learning/student.html
- GitHub：https://github.com/t508-ksvs/pvqc-chemistry-root-learning

## 內容

四個圖文主題：de-、溶解、烷烯炔、數量與醣類。學生版提供 V11 541 詞查詢、另外標示的 6 個延伸詞、發音、待加強標記、每課回想題及複習。講義版連續顯示四課、比較圖、詞義與筆記區，支援列印／另存 PDF，答案預設隱藏，可選擇顯示及列印。

`data/courses.js`、`data/words.js`、`visuals.js` 與 assets 為共用來源。原 14 主題草稿保存在 `draft.html`，不納入正式網站封裝。30 項內容修正並未全部完成；不可把目前四課宣稱為全部課程。

## 發布方式

原私人專案依本次發布要求設為公開。網站採 `gh-pages` 分支根目錄；來源保存在 `preview/representative-lessons`。建議以這個來源分支繼續更新，不要直接修改發布分支。原 main 舊稿保留。

1. `node --test tests/*.test.cjs`
2. `node scripts/package-site.cjs`：輸出專案外的 `../published-site`，只含正式網站需要的 15 個檔案。
3. 將輸出推送至 `gh-pages`，等待 GitHub Pages 部署成功，再核對公開網址。

學習進度只在目前瀏覽器保存；實體手機／教室設備的發音與投影可讀性仍待教師驗收。原 Excel、Google Drive 圖片與 Google Sites 未改寫。
