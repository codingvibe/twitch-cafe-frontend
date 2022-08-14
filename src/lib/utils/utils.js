export function nameEnumToDisplayName(nameEnum) {
    switch(nameEnum) {
        case "DrinkOrder": return "Drink Order";
        case "LurkAnimation": return "Lurk Animation";
        case "FirstMessageAnimation": return "First Message Animation";
        default: throw new Error(`Unknown preference enum ${nameEnum}`);
    }
}

export function getDescriptionFromNameEnum(nameEnum) {
    switch(nameEnum) {
        case "DrinkOrder": return "What you order when you redeem \"Order a Coffee\"";
        case "LurkAnimation": return "Animation that plays when you !lurk";
        case "FirstMessageAnimation": return "Animation that plays on your first message of the stream";
        default: throw new Error(`Unknown preference enum ${nameEnum}`);
    }
}

export function getUrlFromImageName(name) {
    switch(name) {
        case "goku":
            return "/goku.gif";
        case "customer":
            return "/customer.png";
        case "robomaid":
            return "/robomaid.gif";
        default:
            return "/unavailable.svg";
    }
}