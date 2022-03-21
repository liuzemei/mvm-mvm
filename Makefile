all:
	npm run build;tar -czf dist.tar.gz dist;rm -rf dist;
	scp dist.tar.gz test:/home/one/metamask/;
	ssh test "cd metamask;tar -xzf dist.tar.gz;rm dist.tar.gz;exit"
	rm -rf dist.tar.gz;
