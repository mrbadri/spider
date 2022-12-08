function clearUsers() {
    echo
    while true; do
        read -p "$(echo -e "$RED$BOLD"Are you Sure?"$NONE") " yn
        case $yn in
            [Yy]* ) TASK=clearUsers node src/index.js ;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}