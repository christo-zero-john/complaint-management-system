@REM Check for modified files and commit them

@echo off

git ls-files -m
\n
\n
\n
for /f "tokens=*" %%f in ('git ls-files -m') do (
    git add "%%f"
    git commit -m "Found modified or deleted file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)

\n
\n
\n


@REM check for new files and commit them
\n
\n
\n
git ls-files --others --exclude-standard
\n
\n
\n
for /f "tokens=*" %%f in ('git ls-files --others --exclude-standard') do (
    git add "%%f"
    git commit -m "Found new file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)

@REM After commiting push to origin

\n
echo Starting push to Origin
\n
\n

git push