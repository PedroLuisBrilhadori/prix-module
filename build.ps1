rm -Recurse -Force dist && 

echo "";
echo "building...";
echo "";
yarn build && 

echo "";
echo "building types...";
echo "";
yarn build:types && 

echo "";
echo "copying package.json";
echo "";
cp .\package.json .\dist\ &&

echo "";
echo "copying README.md";
echo "";
cp .\README.md .\dist\ &&

cd ./dist && 

echo "";
echo "npm publishing";
echo "";
npm publish;
  
cd ..