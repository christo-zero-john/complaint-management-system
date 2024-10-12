@echo off
for /f "tokens=*" %%f in ('git ls-files --others --exclude-standard') do (
    git add "%%f"
    git commit -m "Created, updated or deleted file,  %%f. Committing Via Global Bash Script."
)
