source ./scripts/colors.bash
source ./scripts/constant.bash
source ./scripts/getUsername.bash
source ./scripts/suggestions.bash
source ./scripts/clearUsers.bash
source ./scripts/sendMail.bash


echo
echo -e "Hi, I'm $PURPLE$BOLD"Spider"$NONE"

while true; do
    read -p "$(echo -e Please Enter My $CYAN$BOLD"Task"$NONE:) " task
    
    case $task in
        get-username ) getUsername exit;;
        
        get-info) TASK=getInfo node src/index.js ;;
        
        send-mail) sendMail ;;
        
        show-users ) TASK=showUsers node src/index.js ;;
        
        clear-users ) clearUsers ;;
        
        
        # if dont enter correct answer
        * ) suggestions ;;
    esac
done