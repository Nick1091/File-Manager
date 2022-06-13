# 1 коммит сделан после дедлайна для правок в READMI.MD, что не запрещено(смотри ниже)
# File-Manager
>run App:  
```npm run start -- --username=your_username```                                          
or
```npm run start --- --username=your_username```
__________________________________________
## List of operations and their syntax:
###Forfeits
- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only `Readme.md`, `.gitignore`, etc.)
### Navigation & working directory (nwd):
- Go upper from current directory:  ```up```;
- Go to dedicated folder from current directory:  ```cd some_directory```; ```cd "some directory"```;
- List all files and folder in current directory and print it to console:  ```ls```;
### Basic operations with files
- Read file and print it's content in console ```cat path_file```; ```cat "path file"```
- Create empty file in current working directory: ```add path_file```; ```add "path file"```
- Rename file: ```rn path_file new_filename```; ```rn "path file" "new filename"```
- Copy file: ```cp path_file new_filename```; ```cp "path file" "new filename"```
- Move file: ```mv path_file new_filename```; ```mv "path file" "new filename"```
- Delete file: ```rm path_file```; ```rm "path filename"```
### Operating system info
- Get EOL: ```os --EOL```
- Get host machine CPUs info: ```os --cpus```
- Get home directory: ```os --homedir```
- Get current system user name: ```os --username```
- Get CPU architecture for which Node.js binary has compiled: ```os --architecture```
### Hash calculation
- Calculate hash for file: ```hash path_to_file```; ```hash "path to file"```
### Compress and decompress operations
- Compress file (using Brotli algorithm): ```compress path_to_file/text.txt path_to_destination/text.txt.br```; ```compress "path to file/text.txt" "path to destination/text.txt.br"```
- Decompress file (using Brotli algorithm): ```decompress path_to_file/text.txt.br path_to_destination/text.txt```; ```decompress "path to file/text.txt.br" "path to destination/text.txt"```
