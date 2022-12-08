function sendMail() {
    echo
    echo -e "My Task is $BOLD"Send Mail"$NONE"
    echo
    
    read -p "$(echo -e Please Enter $CYAN"Subject"$NONE:) " subject
    read -p "$(echo -e Please Enter $CYAN"Text"$NONE:) " text
    
    echo
    
    TASK=sendMail node src/index.js "$subject" "$text"
}