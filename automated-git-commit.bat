@REM Check for modified files and commit them

@echo off

git ls-files -m
echo -e "\n"
echo -e "\n"
echo -e "\n"
for /f "tokens=*" %%f in ('git ls-files -m') do (
    git add "%%f"
    git commit -m "Found modified or deleted file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)

echo -e "\n"
echo -e "\n"
echo -e "\n"


@REM check for new files and commit them
echo -e "\n"
echo -e "\n"
echo -e "\n"
git ls-files --others --exclude-standard
echo -e "\n"
echo -e "\n"
echo -e "\n"
for /f "tokens=*" %%f in ('git ls-files --others --exclude-standard') do (
    git add "%%f"
    git commit -m "Found new file,  %%f. Committing Via Global Bash Script:git-status-automated.bat"
)

@REM After commiting push to origin

echo -e "\n"
echo Starting push to Origin
echo -e "\n"
echo -e "\n"

git push