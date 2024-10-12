@echo off
for /f "tokens=*" %%f in ('git ls-files -m') do (
    git add "%%f"
    git commit -m "Found modified or deleted file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)

@echo off
for /f "tokens=*" %%f in ('git ls-files --others --exclude-standard') do (
    git add "%%f"
    git commit -m "Found new file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)