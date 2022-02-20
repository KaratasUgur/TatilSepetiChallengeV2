# TatilSepetiChallengeV2

İkinci bir versiyonun olmasının sebebi lazy loading ve pagination eklenmesidir.

#Pagination:
FlatList Componentine default olarak tanımlı olan onEndReached methodu ile listenin sonuna geldiğimizi yakalıyoruz, Listenin sonunda Web API'de buna uygun yazılmış 
sorguyu çağrıyoruz(limit ve offset değerine bağlı olarak ön yüzde page değeri tutulur.) ve gelen yeni dataları elimizde olan listeye ekliyoruz. Bu süre zarfında kullanıcın bu işlemi algılaması için default olarak tanımlı olan 
ListFooterComponent'e bir ActivityIndicator ekliyoruz.

#LazyLoading:
Card üzerinde bulunan resimlere; default olarak tanımlı olan onLoadStart ve onLoadEnd methodları sayesinde kullanıcı ile etkileşime geçilmiştir.
Card Componenti internette yaptığım aramalar sonucunda lazy component hale getirilmiştir.

Not: lazy loading'ten kastınız örnek olarak YouTube ilk açıldığında ekranda default bir yapı göstersin datalar daha sonra dolsun ise bunun için version 3'ü yazabilirim.
