// To parse this JSON data, do
//
//     final bir = birFromJson(jsonString);

import 'dart:convert';

Bir birFromJson(String str) => Bir.fromJson(json.decode(str));

String birToJson(Bir data) => json.encode(data.toJson());

class Bir {
    Bir({
        this.length,
        this.data,
    });

    int length;
    List < List < Datum >> data;

    factory Bir.fromJson(Map < String, dynamic > json) => Bir(
        length: json["length"],
        data: List < List < Datum >> .from(json["data"].map((x) => List < Datum > .from(x.map((x) => Datum.fromJson(x))))),
    );

    Map < String, dynamic > toJson() => {
        "length": length,
        "data": List < dynamic > .from(data.map((x) => List < dynamic > .from(x.map((x) => x.toJson())))),
    };
}

class Datum {
    Datum({
        this.slNo,
        this.tag,
        this.rankAtTheTimeOfAward,
        this.name,
    });

    String slNo;
    Tag tag;
    RankAtTheTimeOfAward rankAtTheTimeOfAward;
    Name name;

    factory Datum.fromJson(Map < String, dynamic > json) => Datum(
        slNo: json["Sl. no."],
        tag: tagValues.map[json["Tag"]],
        rankAtTheTimeOfAward: rankAtTheTimeOfAwardValues.map[json["Rank (At the time of award)"]],
        name: nameValues.map[json["NAME"]],
    );

    Map < String, dynamic > toJson() => {
        "Sl. no.": slNo,
        "Tag": tagValues.reverse[tag],
        "Rank (At the time of award)": rankAtTheTimeOfAwardValues.reverse[rankAtTheTimeOfAward],
        "NAME": nameValues.reverse[name],
    };
}

enum Name { WAKAR_HASAN, MUHAMMAD_HAMIDULLAH_KHAN, AYEZ_UDDIN_AHMED_2 }

final nameValues = EnumValues({
    "Ayez Uddin Ahmed[2]": Name.AYEZ_UDDIN_AHMED_2,
    "Muhammad Hamidullah Khan": Name.MUHAMMAD_HAMIDULLAH_KHAN,
    "Wakar Hasan": Name.WAKAR_HASAN
});

enum RankAtTheTimeOfAward { SECOND_LIEUTENANT, SQUADRON_LEADER, EMPTY }

final rankAtTheTimeOfAwardValues = EnumValues({
    "": RankAtTheTimeOfAward.EMPTY,
    "Second Lieutenant": RankAtTheTimeOfAward.SECOND_LIEUTENANT,
    "Squadron Leader": RankAtTheTimeOfAward.SQUADRON_LEADER
});

enum Tag { BANGLADESH_ARMY, BANGLADESH_AIR_FORCE, MUKTI_BAHINI_FREEDOM_FIGHTERS }

final tagValues = EnumValues({
    "Bangladesh Air Force": Tag.BANGLADESH_AIR_FORCE,
    "Bangladesh Army": Tag.BANGLADESH_ARMY,
    "Mukti Bahini (Freedom fighters)": Tag.MUKTI_BAHINI_FREEDOM_FIGHTERS
});

class EnumValues < T > {
    Map < String,
    T > map;
    Map < T,
    String > reverseMap;

    EnumValues(this.map);

    Map < T,
    String > get reverse {
        if (reverseMap == null) {
            reverseMap = map.map((k, v) => new MapEntry(v, k));
        }
        return reverseMap;
    }
}