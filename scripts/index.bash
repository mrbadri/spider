source ./scripts/colors.bash
source ./scripts/constant.bash
source ./scripts/getUsername.bash
source ./scripts/suggestions.bash


echo
echo -e "Hi, I'm $PURPLE$BOLD"Spider"$NONE"
while true; do
    read -p "$(echo -e Please Enter My $CYAN$BOLD"Task"$NONE:) " task
    case $task in
        [getUsername]* ) getUsername exit;;
        
        # if dont enter correct answer
        * ) suggestions ;;
    esac
done