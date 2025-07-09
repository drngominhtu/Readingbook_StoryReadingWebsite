import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Story, Chapter, Tag } from '@/models'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // 1. Tạo tags trước
    const tags = [
      { name: 'Tiên hiệp', description: 'Truyện tu tiên, tu chân, thành thần', color: '#8B5CF6' },
      { name: 'Huyền huyễn', description: 'Thế giới phép thuật, siêu nhiên', color: '#F59E0B' },
      { name: 'Trọng sinh', description: 'Quay lại quá khứ, sống lại', color: '#EC4899' },
      { name: 'Đô thị', description: 'Cuộc sống hiện đại, thành phố', color: '#10B981' },
      { name: 'Hệ thống', description: 'Có hệ thống hỗ trợ, game hóa', color: '#3B82F6' },
    ]
    
    // Xóa và tạo lại tags
    await Tag.deleteMany({})
    const createdTags = await Tag.insertMany(tags)
    
    // 2. Tạo stories mẫu
    const sampleStories = [
      {
        title: 'Tu Tiên Trở Về',
        author: 'Nguyễn Văn A',
        description: 'Sau khi tu luyện hàng nghìn năm ở thế giới tu tiên, Lý Thiên đột nhiên trở về Trái Đất khi còn là học sinh cấp 3. Với kinh nghiệm và sức mạnh từ kiếp trước, anh quyết định thay đổi cuộc đời mình và bảo vệ những người thân yêu.',
        coverImage: '',
        tags: [createdTags[0]._id, createdTags[2]._id], // Tiên hiệp + Trọng sinh
        status: 'ongoing',
        viewCount: 1250,
        chapterCount: 0
      },
      {
        title: 'Thần Cấp Hệ Thống',
        author: 'Trần Văn B',
        description: 'Tỉnh dậy sau tai nạn, Phạm Minh phát hiện mình có một hệ thống siêu mạnh. Từ kẻ bình thường, anh trở thành người mạnh nhất thế giới với sự trợ giúp của hệ thống toàn năng.',
        coverImage: '',
        tags: [createdTags[1]._id, createdTags[4]._id], // Huyền huyễn + Hệ thống
        status: 'ongoing',
        viewCount: 980,
        chapterCount: 0
      },
      {
        title: 'Đô Thị Tu Tiên',
        author: 'Lê Thị C',
        description: 'Trong thời đại hiện đại, linh khí đột nhiên phục hồi. Các tu sĩ cổ đại tỉnh dậy, thế giới bước vào kỷ nguyên mới. Chủ nhân công là một sinh viên đại học bình thường, nhưng lại có thể nhìn thấy linh khí.',
        coverImage: '',
        tags: [createdTags[0]._id, createdTags[3]._id], // Tiên hiệp + Đô thị
        status: 'completed',
        viewCount: 2100,
        chapterCount: 0
      }
    ]
    
    // Xóa và tạo lại stories
    await Story.deleteMany({})
    await Chapter.deleteMany({})
    const createdStories = await Story.insertMany(sampleStories)
    
    // 3. Tạo chapters cho mỗi story
    const allChapters = []
    
    // Story 1: Tu Tiên Trở Về
    const story1Chapters = [
      {
        title: 'Trở về quá khứ',
        content: `Lý Thiên từ từ mở mắt, ánh sáng chói chang khiến anh phải nheo mắt lại.

"Đây là... phòng ngủ của ta khi còn ở Trái Đất?"

Nhìn quanh căn phòng quen thuộc, Lý Thiên không khỏi bàng hoàng. Vừa rồi anh còn đang ở Thiên Tiên Giới, chuẩn bị đột phá sang境界 Đại La Cảnh, nhưng tại sao lại xuất hiện ở đây?

"Không đúng... thân thể này..."

Lý Thiên nhìn xuống bàn tay mình, đây rõ ràng là thân thể của anh khi mới 18 tuổi. Da thịt trắng nõn, không có một chút sẹo tích từ việc tu luyện.

"Ta đã trở về quá khứ sao?"

Ký ức từ từ trở lại. Ngày hôm nay, chính là ngày anh thi xong kỳ thi đại học. Cũng chính từ hôm nay, cuộc đời anh bắt đầu xuống dốc.

"Lần này, ta sẽ không để những bi kịch đó xảy ra nữa!"

Lý Thiên nắm chặt tay, trong mắt có tia sáng kiên định. Với kinh nghiệm tu luyện hàng nghìn năm, anh có thể bảo vệ gia đình và thay đổi tất cả.`,
        chapterNumber: 1,
        storyId: createdStories[0]._id,
        viewCount: 450
      },
      {
        title: 'Sức mạnh tỉnh dậy',
        content: `"Lý Thiên! Mày có biết mình đã làm gì không?"

Vừa bước xuống lầu, Lý Thiên đã thấy cha mình đang ngồi ở bàn, mặt đầy tức giận.

"Con biết lỗi rồi, ba."

Lý Thiên cúi đầu, trong lòng cảm thấy ấm áp. Đã bao lâu rồi anh không được nghe thấy giọng nói của cha? Ở Thiên Tiên Giới, cha mẹ anh đã mất từ lâu vì anh không đủ mạnh để bảo vệ.

"Biết lỗi? Mày có biết gia đình Trương họ đã đến đây làm gì không?"

Nghe đến họ Trương, Lý Thiên mắt lạnh lại. Họ Trương - chính là những kẻ đã hại chết cha mẹ anh trong kiếp trước!

"Ba đừng lo, con sẽ xử lý."

"Xử lý sao? Mày đánh con trai họ Trương trong trường, bây giờ họ đòi bồi thường 500 triệu!"

Lý Thiên nhớ ra, hôm qua Trương Minh đã bắt nạt một nữ sinh, anh đã đánh để bảo vệ cô ấy. Chính vì việc này mà sau đó họ Trương đã trả thù gia đình anh.

"Ba, con sẽ đến gặp họ Trương."

"Mày điên rồi sao? Đừng có làm chuyện ngu ngốc nữa!"

Nhưng Lý Thiên đã quyết định. Lần này, anh sẽ là người chủ động tấn công!`,
        chapterNumber: 2,
        storyId: createdStories[0]._id,
        viewCount: 380
      },
      {
        title: 'Đối đầu họ Trương',
        content: `Biệt thự họ Trương nằm ở khu nhà giàu, với kiến trúc tráng lệ và hàng rào cao.

Lý Thiên bước đến cổng, hai tên bảo vệ lập tức chặn lại.

"Cậu nhóc, đây không phải nơi cậu có thể vào!"

"Ta đến gặp Trương Gia Thành."

"Ông chủ có hẹn với cậu sao? Cút đi!"

Lý Thiên mỉm cười lạnh. Trong kiếp trước, anh cũng đã đến đây, nhưng lúc đó chỉ biết cầu xin. Giờ thì khác rồi.

"Không cần hẹn."

Anh đưa tay ra, một luồng nội lực vô hình phát ra. Hai tên bảo vệ như bị gió thổi bay, ngã xuống đất bất tỉnh.

Cổng sắt tự động mở ra trước sức mạnh thần bí.

"Trương Gia Thành, ta đến đây rồi!"

Tiếng nói của Lý Thiên vang khắp biệt thự, chứa đựng uy áp mà chỉ những cao thủ tu tiên mới có được.

Từ trong nhà, Trương Gia Thành vội vàng chạy ra, mặt đầy kinh hoàng.

"Này... cậu là ai? Sao lại..."

"Ta là Lý Thiên. Lần trước ngươi dám đe dọa gia đình ta, hôm nay ta đến đòi lại!"

Trương Gia Thành run rẩy. Anh ta có thể cảm nhận được một áp lực kinh khủng từ cậu thanh niên này.

"Cậu... cậu muốn gì?"

"Đơn giản thôi. Từ nay về sau, không được quấy rầy gia đình ta nữa. Nếu không..."

Lý Thiên không nói nữa, nhưng ánh mắt đã nói lên tất cả.`,
        chapterNumber: 3,
        storyId: createdStories[0]._id,
        viewCount: 420
      }
    ]
    
    // Story 2: Thần Cấp Hệ Thống
    const story2Chapters = [
      {
        title: 'Tỉnh dậy với hệ thống',
        content: `"Ding! Thần Cấp Hệ Thống đã được kích hoạt!"

Phạm Minh giật mình tỉnh dậy, đầu còn đau nhức từ vụ tai nạn. Anh đang nằm trên giường bệnh viện, nhưng điều khiến anh chú ý không phải là vết thương, mà là dòng chữ phát sáng xuất hiện trước mắt.

"Đây là gì vậy?"

"Host đã tỉnh dậy! Hệ thống đang tiến hành kết nối... Kết nối thành công!"

"Chào mừng Host đến với Thần Cấp Hệ Thống! Đây là hệ thống toàn năng có thể giúp Host trở thành người mạnh nhất vũ trụ!"

Phạm Minh hoàn toàn không thể tin được. Anh vốn chỉ là một nhân viên văn phòng bình thường, cuộc sống nhàm chán. Nhưng giờ đây...

"Hệ thống... có thật không?"

"Tất nhiên có thật! Để chứng minh, hệ thống sẽ tặng Host gói quà tân thủ!"

"Ding! Nhận được: Thể chất cường hóa (Cấp 1), Nhãn lực thần bí, 1000 điểm tích lũy!"

Ngay lập tức, Phạm Minh cảm thấy cơ thể mình có những thay đổi kỳ lạ. Cơ bắp trở nên chắc khỏe hơn, thị lực cũng rõ nét hơn nhiều.

"Không thể tin được... Đây có phải là giấc mơ không?"

Anh nhìn ra cửa sổ, có thể thấy rõ từng chi tiết ở tòa nhà cách xa hàng trăm mét.

"Đây không phải giấc mơ, Host. Từ giờ, cuộc đời của Host sẽ hoàn toàn thay đổi!"`,
        chapterNumber: 1,
        storyId: createdStories[1]._id,
        viewCount: 320
      },
      {
        title: 'Sức mạnh đầu tiên',
        content: `Ba ngày sau khi xuất viện, Phạm Minh quyết định thử nghiệm sức mạnh mới.

"Hệ thống, ta có thể làm gì với 1000 điểm tích lũy?"

"Host có thể mua các kỹ năng trong shop hệ thống. Hiện tại có: Võ thuật cơ bản (500 điểm), Kiến thức toàn diện (300 điểm), Charm tự nhiên (200 điểm)."

"Mua Võ thuật cơ bản và Kiến thức toàn diện."

"Ding! Đã mua thành công! Đang truyền tải kiến thức..."

Một luồng thông tin khổng lồ đổ vào đầu Phạm Minh. Các động tác võ thuật, kiến thức về khoa học, lịch sử, văn học... tất cả đều được ghi nhớ một cách hoàn hảo.

"Tuyệt vời!"

Phạm Minh thử đấm vào tường, tạo ra một vết nứt sâu. Sức mạnh của anh giờ đây đã vượt xa con người bình thường.

Đột nhiên, tiếng la hét vang lên từ ngoài đường.

"Cướp! Có người cướp túi!"

Phạm Minh nhìn ra ngoài, thấy một thanh niên đang cướp túi xách của một cô gái và chạy về phía mình.

"Đây là cơ hội để thử sức mạnh!"

Anh nhảy từ tầng 3 xuống đất một cách nhẹ nhàng, khiến mọi người kinh ngạc.

Tên cướp chạy tới, Phạm Minh chỉ đưa tay ra chặn lại. Với sức mạnh hiện tại, gã cướp như đâm vào bức tường thép.

"Aaaah!"

Tên cướp bay ngược trở lại, ngã xuống đất bất tỉnh.

"Ding! Hoàn thành nhiệm vụ ngẫu nhiên: Trừ gian diệt ác! Nhận được 200 điểm tích lũy!"

Mọi người xung quanh vỗ tay rầm rộ, còn cô gái bị cướp chạy đến cảm ơn với ánh mắt đầy ngưỡng mộ.`,
        chapterNumber: 2,
        storyId: createdStories[1]._id,
        viewCount: 290
      }
    ]
    
    // Story 3: Đô Thị Tu Tiên
    const story3Chapters = [
      {
        title: 'Linh khí phục hồi',
        content: `Nguyễn Văn Đức đang ngồi trong thư viện đại học, chuẩn bị cho kỳ thi cuối kỳ thì đột nhiên cảm thấy có gì đó lạ trong không khí.

Một làn sương mỏng manh, phát ra ánh sáng nhẹ nhàng, đang lan tỏa khắp nơi. Nhưng dường như chỉ có anh nhìn thấy được.

"Đây là gì vậy?"

Anh đưa tay chạm vào làn sương, ngay lập tức cảm thấy một luồng năng lượng mát lạnh chạy khắp cơ thể.

"Thiên địa linh khí... không thể nào!"

Những ký ức từ những cuốn tiểu thuyết tu tiên anh từng đọc trở lại. Linh khí - nguồn năng lượng mà các tu sĩ sử dụng để tu luyện.

"Không thể là thật được..."

Nhưng khi anh tập trung tinh thần, có thể cảm nhận rõ ràng những dòng chảy năng lượng trong không khí. Và quan trọng hơn, anh có thể hấp thụ chúng!

Đột nhiên, tiếng la hét vang lên từ ngoài sân trường.

"Quái vật! Có quái vật!"

Nguyễn Văn Đức chạy ra ngoài, thấy một con mèo to như con chó đang tấn công sinh viên. Lông của nó phát sáng với ánh sáng kỳ lạ.

"Linh thú... Mèo đã hấp thụ linh khí và biến dị!"

Trong khi mọi người đều hoảng sợ chạy trốn, Nguyễn Văn Đức bình tĩnh quan sát. Anh có thể thấy được dòng chảy linh khí xung quanh con mèo.

"Nếu ta có thể kiểm soát linh khí..."

Anh tập trung tinh thần, cố gắng điều khiển linh khí xung quanh mình. Một luồng năng lượng nhẹ nhàng tụ lại ở bàn tay.

Con mèo phát hiện ra anh, quay lại với ánh mắt hung dữ. Nó nhảy vọt đến với tốc độ kinh người.

Nguyễn Văn Đức đẩy tay ra phía trước, luồng linh khí bắn ra như một tia sáng, đánh trúng con mèo giữa không trung.

"Meooow!"

Con mèo rơi xuống đất, quay lại kích thước bình thường và chạy trốn.

"Ta... ta đã làm được!"

Từ hôm nay, thế giới sẽ bước vào một kỷ nguyên hoàn toàn mới.`,
        chapterNumber: 1,
        storyId: createdStories[2]._id,
        viewCount: 380
      }
    ]
    
    // Thêm tất cả chapters
    allChapters.push(...story1Chapters, ...story2Chapters, ...story3Chapters)
    const createdChapters = await Chapter.insertMany(allChapters)
    
    // 4. Cập nhật chapterCount cho các stories
    for (const story of createdStories) {
      const chapterCount = allChapters.filter(chapter => 
        chapter.storyId.toString() === story._id.toString()
      ).length
      
      await Story.findByIdAndUpdate(story._id, { chapterCount })
    }
    
    return NextResponse.json({
      success: true,
      message: `Tạo dữ liệu mẫu thành công!`,
      data: {
        tags: createdTags.length,
        stories: createdStories.length,
        chapters: createdChapters.length
      }
    })
    
  } catch (error) {
    console.error('Error creating sample data:', error)
    return NextResponse.json(
      { 
        error: 'Lỗi khi tạo dữ liệu mẫu',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
